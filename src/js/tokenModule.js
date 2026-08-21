// token.js のモジュール版（example.js など module スクリプトから利用する）
export const token = sessionStorage.getItem('token');
export const limit = Number(sessionStorage.getItem('limit') || 0);
export const sendBtn = document.getElementById('sendBtn');
export const responseView = document.getElementById('responseView');
export const requestURL = document.getElementById('requestURL');
