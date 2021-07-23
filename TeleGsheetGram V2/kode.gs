// masukkan TOKEN BOT dari BOT Father
const token = '1924791479:AAHL5poHEP_b_hK4Njh_NPfW2aW6qxvgLqM'

const tg = new telegram.daftar(token)

// masukkan ID kamu, jika belum tau cek di @strukturbot
const adminBot = 46160407

// jika debug true, akan mengirimkan struktur JSON ke admin bot
const debug = false

var sheetID = '1gnRB-H7wPrfmGSaQ-2nEsQgjqyET9TvBV56aXsaULBs'
var db = new miniSheetDB.init(sheetID, 'Data', true);
var db2 = new miniSheetDB.init(sheetID, 'Data2', true);
var db3 = new miniSheetDB.init(sheetID, 'Data3', true);
var db4 = new miniSheetDB.init(sheetID, 'Data4', true);
db3.nKolom = 4
db4.nKolom = 6









// -- fungsi telegram

// cek informasi bot
function getMe() {
  let me = tg.getMe()
  return Logger.log(me)
}

function setWebhook() {
  var url = "https://script.google.com/macros/s/AKfycbxm0wdS9xEHRJquaQx-p1L4y_6YYyeZlR6JQRcdp3_YDAvM1gnnMh6vL7QXLBfLOiOTEw/exec"
  var r = tg.setWebhook(url)
  return Logger.log(r)
}

// cek info hook bot
function getWebhookInfo() {
  let hasil = tg.getWebhookInfo()
  return Logger.log(hasil)
}

// hapus hook
function deleteWebhook() {
  let hasil = tg.deleteWebhook()
  return Logger.log(hasil)

}

// -- kalau mau bikin fungsi sendiri, taruh di bawah sini ---
