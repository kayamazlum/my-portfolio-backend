const About = require("../models/about");

const getAbout = async (req, res) => {
  try {
    const aboutData = await About.find();
    if (!aboutData || !aboutData.length) {
      return res.status(400).json({
        message: "About datası bulunamadı!",
      });
    }

    res.status(200).json({
      aboutData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Bir hata oluştu",
      error: error.message,
    });
  }
};

const addAbout = async (req, res) => {
  try {
    const isAbout = await About.find();
    if (isAbout.length !== 0) {
      return res.status(500).json({
        message: "Zaten about var! Lütfen güncelleme işlemi yapınız.",
      });
    }

    // Skills alanını virgül ile ayır ve diziye dönüştür
    const aboutData = {
      ...req.body,
      skills: req.body.skills ? req.body.skills.split(",") : [],
    };

    const about = await About.create(aboutData);

    res.status(201).json({
      about,
      message: "About oluşturuldu!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Bir hata oluştu",
      error: err.message,
    });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { _id, skills, ...updateData } = req.body;
    if (!_id) {
      throw new Error("_id bilgisi bulunamadı!", 404);
    }

    // Skills alanını virgül ile ayır ve diziye dönüştür
    if (skills) {
      updateData.skills = skills.split(",");
    }

    const newAbout = await About.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!newAbout) {
      return res.status(404).json({
        message: "about bulunamadı!",
      });
    }

    res.status(200).json({
      message: "Güncelleme başarılı!",
      newAbout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Bir hata oluştu",
      error: error.message,
    });
  }
};

module.exports = { getAbout, addAbout, updateAbout };
