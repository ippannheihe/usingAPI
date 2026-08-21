// token.js のモジュール版（example.js など module スクリプトから利用する）
export const token = sessionStorage.getItem('token');
export let limit = Number(sessionStorage.getItem('limit') || 0);
export const sendBtn = document.getElementById('sendBtn');
export const responseView = document.getElementById('responseView');
export let requestURL = document.getElementById('requestURL');
