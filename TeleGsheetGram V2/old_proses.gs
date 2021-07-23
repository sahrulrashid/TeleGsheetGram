// fungsi buat handle hanya menerima pesan berupa POST, kalau GET keluarkan pesan error
function doGet(e) {
  return tg.util.outputText("Hanya data POST yang kita proses yak!");
}

// fungsi buat handle pesan POST
function doPost(e) {
  // data e kita verifikasi
  var update = tg.doPost(e);

  // jika data valid proses pesan
  if (update) {
    prosesPesan(update)
  }

}

// fungsi utama untuk memproses segala pesan yang masuk
function prosesPesan(update) {

  // deteksi tipe message
  if (update.message) {

    // penyederhanaan variable
    var msg = update.message;

    // deteksi event letakkan di sini

    // jika ada pesan berupa text
    if (msg.text) {

      // jika user klik start, bot akan menjawab
      var pola = /\/start/i
      if (pola.exec(msg.text)) {
        var pesan = '<b>Selamat Datang Ke TeleSheetGram Bot</b>';
        pesan += '\nPastikan Anda Baca Arahan Sebelum Menggunakan Bot ini';

        return tg.sendMsg(msg, pesan, 'HTML')
      }

      // jika user ketik /ping, bot akan jawab Pong!
      // pola dan jawaban paling sederhana
      var pola = /^[\/!]ping$/i
      if (pola.exec(msg.text)) {
        // balas pong dengan mereply pesan
        // menggunakan parse_mode Markdown
        return tg.sendMessage(msg.chat.id, '🏓 *Pooong!*', 'Markdown', false, false, msg.message_id)
      }


      // kalau mau kembangin sendiri menjadi bot interaktif, code nya taruh di bawah ini
      // -- mulai custom deteksi text --

      //--------------------------------------------------------------------------------------
      // untuk paparkan data dari kolumn 2 saja
      var pola = /^semakpdpr ([\d-]+)$/i
      if (cocok = pola.exec(msg.text)) {
        var nokp = cocok[1]
        var pesan = db.get(nokp)

        if (pesan) {
          return tg.sendMsg(msg, pesan.data)
        } else {
          return tg.sendMsg(msg, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.')
        }
      }
      //-----------------------------------------------------------------------------------------
      // untuk paparkan data dari banyak kolumn, masalah bila ubah kena selalu deploy
      var pola = /^semakic ([\d-]+)$/i
      if (cocok = pola.exec(msg.text)) {
        var nokp = cocok[1]
        var hasil = db3.get(nokp)

        if (hasil) {
          var pesan = 'Nama: ' + hasil.data[0]
          pesan += '\nNo K/P: ' + hasil.data[1]
          pesan += '\nKelas: ' + hasil.data[2]

          return tg.sendMsg(msg, pesan)
        } else {
          return tg.sendMsg(msg, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.')
        }
      }

      //-------------------------------------------------------------------------------------
      // untuk paparkan data dari kolumn 2 saja dari sheet berlainan
      var pola = /^semaknama ([\d-]+)$/i
      if (cocok = pola.exec(msg.text)) {
        var nokp = cocok[1]
        var pesan = db2.get(nokp)

        if (pesan) {
          return tg.sendMsg(msg, pesan.data)
        } else {
          return tg.sendMsg(msg, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.')
        }
      }
      //-------------------------------------------------------------------------------------
      // untuk paparkan data dari kolumn lain pula , semak 123456-12-4567 hadir
      var pola = /^semak ([\d-]+) (\w+)$/i
      if (cocok = pola.exec(msg.text)) {
        var nokp = cocok[1]
        var hasil = db4.get(nokp)

        var kolumn = cocok[2].toUpperCase()
        var kolom

        switch (kolumn) {
          case 'HADIR':
            kolom = 3
            break;
          case 'PERATUS':
            kolom = 4
            break;
          default:
            kolom = false
        }

        if (hasil) {
          if (!kolom) tg.sendMsg(msg, 'Data Tidak Dijumpai. Harap Maaf')

          var pesan = 'NAMA: ' + hasil.data[0]
          pesan += '\nNO. K/P: ' + hasil.data[1]
          pesan += '\nKELAS: ' + hasil.data[2]
          pesan += '\n' + kolumn + ': ' + hasil.data[kolom]

          return tg.sendMsg(msg, pesan)
        } else {
          return tg.sendMsg(msg, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.')
        }
      }

//-------------------------------------------------------------------------------------
      // untuk paparkan data dari kolumn lain pula , semak hadir 123456-12-4567
      var pola = /^semak (\w+) ([\d-]+)$/i
      if (cocok = pola.exec(msg.text)) {
        var nokp = cocok[2]
        var hasil = db4.get(nokp)

        var kolumn = cocok[1].toUpperCase()
        var kolom

        switch (kolumn) {
          case 'HADIR':
            kolom = 3
            break;
          case 'PERATUS':
            kolom = 4
            break;
          default:
            kolom = false
        }

        if (hasil) {
          if (!kolom) tg.sendMsg(msg, 'Data Tidak Dijumpai. Harap Maaf')

          var pesan = 'NAMA: ' + hasil.data[0]
          pesan += '\nNO. K/P: ' + hasil.data[1]
          pesan += '\nKELAS: ' + hasil.data[2]
          pesan += '\n' + kolumn + ': ' + hasil.data[kolom]

          return tg.sendMsg(msg, pesan)
        } else {
          return tg.sendMsg(msg, '📣 Maaf. Data tidak dijumpai! \nJika masih tiada. Sila hubungi guru kelas anda.')
        }

      }

      //-------------------------------------------------------------------------------------
      //mesej yang akan keluar bila user salan masuk format semakan. Ubah ikut pola yang anda buat
      var pola = /\w+/i
      if (pola.exec(msg.text)) {
        var pesan1 = '<b>📣Anda Telah Menaip Format Carian Yang Salah!</b>';
        pesan1 += '\n<b>Pastikan Anda Baca Arahan Sebelum Menggunakan Bot ini</b>';
        pesan1 += '\n📣Format Carian';
        pesan1 += '\n✅ Untuk semakan Bilangan Hadir PDPR Murid, Taip dengan format:-';
        pesan1 += '\n<b>semak 123456-12-1234 hadir</b>';
        pesan1 += '\n✅ Untuk semakan Bilangan % Hadir PDPR Murid, Taip dengan format:-';
        pesan1 += '\n<b>semak 123456-12-1234 peratus</b>';
        return tg.sendMsg(msg, pesan1, 'HTML')
      }


      // akhir deteksi pesan text
    }

    // akhir update message
  }


}
