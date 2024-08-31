

import multer from 'multer';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Renombra el archivo para evitar colisiones
  }
});

const upload = multer({ storage: storage });

export default upload;