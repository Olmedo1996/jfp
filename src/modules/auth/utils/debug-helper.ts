import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  iat: number;
  user_id: number;
  token_type: string;
  jti?: string;
}

/**
 * Helper para debug de tokens JWT
 */
export const debugToken = (token: string, label = 'Token') => {
  if (process.env.NODE_ENV !== 'development') return;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = decoded.exp - now;
    const isExpired = timeUntilExpiry <= 0;
    const isExpiringSoon = timeUntilExpiry <= 300; // 5 minutos

    console.group(`🔍 ${label} Debug`);
    console.log('📅 Current time (seconds):', now);
    console.log('📅 Token issued at (seconds):', decoded.iat);
    console.log('📅 Token expires at (seconds):', decoded.exp);
    console.log('⏰ Time until expiry (seconds):', timeUntilExpiry);
    console.log(
      '⏰ Time until expiry (minutes):',
      Math.floor(timeUntilExpiry / 60)
    );
    console.log('🔴 Is expired:', isExpired);
    console.log('🟡 Is expiring soon (< 5min):', isExpiringSoon);
    console.log('👤 User ID:', decoded.user_id);
    console.log('🏷️ Token type:', decoded.token_type);
    if (decoded.jti) console.log('🆔 JTI:', decoded.jti);
    console.log('🔑 Token (first 50 chars):', token.substring(0, 50) + '...');
    console.groupEnd();

    return {
      decoded,
      isExpired,
      isExpiringSoon,
      timeUntilExpiry,
    };
  } catch (error) {
    console.error(`❌ Error decoding ${label}:`, error);
    return null;
  }
};

/**
 * Compara dos tokens y muestra las diferencias
 */
export const compareTokens = (oldToken: string, newToken: string) => {
  if (process.env.NODE_ENV !== 'development') return;

  console.group('🔄 Token Comparison');
  const oldInfo = debugToken(oldToken, 'Old Token');
  const newInfo = debugToken(newToken, 'New Token');

  if (oldInfo && newInfo) {
    const timeDiff = newInfo.decoded.exp - oldInfo.decoded.exp;
    console.log('📈 Expiry time difference (seconds):', timeDiff);
    console.log(
      '📈 Expiry time difference (hours):',
      Math.floor(timeDiff / 3600)
    );
  }
  console.groupEnd();
};
