const Hero = require("../models/hero");

const getHero = async (req, res) => {
  try {
    const heroData = await Hero.find();
    if (!heroData || !heroData.length) {
      return res.status(400).json({
        message: "Hero datası bulunamadı!",
      });
    }
    res.status(200).json({
      heroData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Bir hata oluştu!",
      error: error.message,
    });
  }
};

const addHero = async (req, res) => {
  try {
    const isHero = await Hero.find();
    if (isHero.length != 0) {
      return res.status(500).json({
        message: "Zaten bir hero var!",
      });
    }

    const hero = await Hero.create(req.body);
    res.status(201).json({
      hero,
      message: "Hero oluşturuldu!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Bir hata oluştu!",
      error: error.message,
    });
  }
};

const updateHero = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    if (!_id) {
      throw new Error("_id bilgisi bulunamadı!", 404);
    }

    const newHero = await Hero.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!newHero) {
      return res.status(404).json({
        message: "Hero bulunamadı!",
      });
    }

    res.status(200).json({
      message: "Güncelleme başarılı",
      newHero,
    });
  } catch (error) {
    res.status(500).json({
      message: "Bir hata oluştu!",
      error: error.message,
    });
  }
};

module.exports = { getHero, addHero, updateHero };
