// masukkan token bot anda disini
var token = "1932830423:AAGsa3eYX9DOn8iWn8quqji8_iniQym4w4k";
//masukkan id google sheet anda disini
var SheetID = "1GH1CQjygpaGc0SJPrhomfduTJHV_PUR7KwXxff4UGzI";
// masukkan id webapp yang dicopy selepas deploy disini
var webAppUrl = "https://script.google.com/macros/s/AKfycbzn2JMmcasN-gYOChnxRk2AoMks2IUzYZ60MVFmfMQtCI2GeecPwZ7uYXV_A1-XFKJ0WQ/exec";
//jangan ubah yang ini
var telegramUrl = "https://api.telegram.org/bot" + token;
// masukkan Nama Sheet dan Range Data anda
var db1 = 'PDPR!A2:B'; // ubah nama sheet dan column
var db2 = 'KOKO!A2:B'; // ubah nama sheet dan column

function doPost(e) {
  var stringJson = e.postData.getDataAsString();
  var updates = JSON.parse(stringJson);
  // penyederhanaan variable
  var msg = updates.message;

  if (msg.text) {


    //mesej yang akan keluar bila user tekan start bot /start
    var pola = /\/start/i
    if (pola.exec(msg.text)) {
      var pesan = '<b>Selamat Datang Ke TeleSheetGram Bot</b>';
      pesan += '\n<b>Pastikan Anda Baca Arahan Sebelum Menggunakan Bot ini</b>';
      pesan += '\n📣Format Carian';
      pesan += '\n✅ Untuk semakan KOKO Murid, Taip dengan format:-';
      pesan += '\n<b>semakkoko 123456-12-1234</b>';
      pesan += '\natau <b>semak koko 123456-12-1234</b>';
      pesan += '\n✅ Untuk semakan PDPR Murid, Taip dengan format:-';
      pesan += '\n<b>semakpdpr 123456-12-1234</b>';
      pesan += '\natau <b>semak pdpr 123456-12-1234</b>';
      return sendText(msg.chat.id, pesan);
    }

    // jika user ketik /ping, bot akan jawab Pong!
    // pola dan jawaban paling sederhana
    var pola = /^[\/!]ping$/i
    if (pola.exec(msg.text)) {
      // balas pong dengan mereply pesan
      // menggunakan parse_mode Markdown
      return sendText(msg.chat.id, '🏓 *Pooong!*');
    }

    //------------------------------------------------------------------------
    /*
        // untuk paparkan data dari kolumn 2 saja pada sheet 1
        var pola = /^semakpdpr ([\d-]+)$/i  // pola ini digunakan untuk carian digit IC
        if (cocok = pola.exec(msg.text)) {
          var nokp = cocok[1]
          var pesan = searchColumnById(nokp, db1)
    
          if (pesan) {
            return sendText(msg.chat.id, pesan);
          } else {
            return sendText(msg.chat.id, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.');
          }
        }
    
        // untuk paparkan data dari kolumn 2 saja pada sheet ke 2
        var pola = /^semakkoko ([\d-]+)$/i  // pola ini digunakan untuk carian digit IC
        if (cocok = pola.exec(msg.text)) {
          var nokp = cocok[1]
          var pesan = searchColumnById(nokp, db2)
    
          if (pesan) {
            return sendText(msg.chat.id, pesan);
          } else {
            return sendText(msg.chat.id, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.');
          }
        }
    */
    //---------------------------------
    // untuk paparkan data dari SHEET lain pula , FORMAT SEMAKAN :- semak pdpr 123456-12-4567 atau semakpdpr 123456-12-4567
    var pola = /^semak (\w+) ([\d-]+)$/i
    var pola1 = /^semak(\w+) ([\d-]+)$/i
    if ((cocok = pola.exec(msg.text)) || (cocok = pola1.exec(msg.text))) {
      var nokp = cocok[2]

      var namasheet = cocok[1].toUpperCase()

      switch (namasheet) {
        case 'PDPR': // kata kunci untuk cari data di sheet PDPR, sesuaikan dengan nama sheet anda
          var pesan = searchColumnById(nokp, db1)

          if (pesan) {
            return sendText(msg.chat.id, pesan);
          } else {
            return sendText(msg.chat.id, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.');
          }
          break;
        case 'KOKO':  // kata kunci untuk cari data di sheet KOKO, sesuaikan dengan nama sheet anda
          var pesan = searchColumnById(nokp, db2)

          if (pesan) {
            return sendText(msg.chat.id, pesan);
          } else {
            return sendText(msg.chat.id, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.');
          }
          break;
        default:
          kolom = false
      }


    }
    //-----------------

    //mesej yang akan keluar bila user salan masuk format semakan. Ubah ikut pola yang anda buat
    var pola = /\w+/i
    if (pola.exec(msg.text)) {
      var pesan1 = '<b>📣Anda Telah Menaip Format Carian Yang Salah!</b>';
      pesan1 += '\n<b>Pastikan Anda Baca Arahan Sebelum Menggunakan Bot ini</b>';
      pesan1 += '\n📣Format Carian';
      pesan1 += '\n✅ Untuk semakan KOKO Murid, Taip dengan format:-';
      pesan1 += '\n<b>semakkoko 123456-12-1234</b>';
      pesan1 += '\natau <b>semak koko 123456-12-1234</b>';
      pesan1 += '\n✅ Untuk semakan PDPR Murid, Taip dengan format:-';
      pesan1 += '\n<b>semakpdpr 123456-12-1234</b>';
      pesan1 += '\natau <b>semak pdpr 123456-12-1234</b>';
      return sendText(msg.chat.id, pesan1);
    }

    //guna ini bila tak nak guna pola carian
    // sendText(msg.chat.id, searchColumnById(msg.text, db1));
  }

}





function searchColumnById(dataid, rangeName) {
  var sheetdata = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
  for (var row = 0; row < sheetdata.length; row++) {
    if (sheetdata[row][0] == dataid) {
      return sheetdata[row][1];
    }
  }
  return " 📣Data Anda Tiada. Sila Semak Format Carian Anda. \nSila Hubungi Guru Kelas Anda.";
}


// untuk set webhook..sekali sahaja tau jika terputus
function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  return Logger.log(response)
}

function sendText(chatid, text, replymarkup) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatid),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(replymarkup)
    }
  };
  UrlFetchApp.fetch(telegramUrl + '/', data);
}

function sendMsgKeyboardInline(msg, text, keyboard, parse_mode, disable_web_page_preview, reply_to_message_id) {
  parse_mode = parse_mode || 'HTML';
  var reply_markup = {
    inline_keyboard: keyboard
  }
  return this.sendText(msg.chat.id, text, parse_mode, disable_web_page_preview, false, reply_to_message_id, reply_markup);
}


