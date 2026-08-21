const token = sessionStorage.getItem('token');
let limit = Number(sessionStorage.getItem('limit') || 0);
const sendBtn = document.getElementById('sendBtn');
const responseView = document.getElementById('responseView');
let requestURL = document.getElementById('requestURL');
