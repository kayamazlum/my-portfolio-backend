const Projects = require("../models/projects");

const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    if (!projects || !projects.length) {
      return res.status(400).json({
        message: "Henüz bir proje eklenmedi!",
      });
    }

    res.status(200).json({
      projects,
    });
  } catch (err) {
    res.status(500).json({
      message: "Beklenmedik bir hata oluştu!",
      error: err.message,
    });
  }
};

const addProject = async (req, res) => {
  try {
    console.log("Files:", req.files); // Gelen dosyaları kontrol et

    if (!req.files || !Array.isArray(req.files) || !req.files.length) {
      return res
        .status(400)
        .json({ message: "En az bir resim yüklemelisiniz!" });
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`); // Map işlemi

    const projectData = {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      image_url: imageUrls, // Resim URL'leri
      skills: req.body.skills.split(","), // Skills'ı diziye dönüştür
      site_url: req.body.site_url,
    };

    const project = await Projects.create(projectData);

    res.status(201).json({
      message: "Proje başarıyla eklendi!",
      project,
    });
  } catch (error) {
    console.error(error); // Hata detaylarını logla
    res.status(500).json({
      message: "Beklenmedik bir hata oluştu!",
      error: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { _id } = req.body;
    const imageUrls = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : undefined;

    const updateData = {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      skills: req.body.skills.split(","),
      site_url: req.body.site_url,
    };

    if (imageUrls) {
      updateData.image_url = imageUrls;
    }

    const project = await Projects.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({
        message: "Proje bulunamadı!",
      });
    }

    res.status(200).json({
      message: "Proje başarıyla güncellendi!",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Beklenmedik bir hata oluştu!",
      error: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { _id } = req.body;
    const project = await Projects.findByIdAndDelete(_id);

    if (!project) {
      return res.status(404).json({
        message: "Proje bulunamadı!",
      });
    }

    res.status(200).json({
      message: "Proje başarıyla silindi!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Beklenmedik bir hata oluştu!",
      error: error.message,
    });
  }
};

const detailsProject = async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) {
      return res.status(400).json({
        message: "Proje ID'si geçersiz!",
      });
    }
    const selectedProject = await Projects.findById(_id);
    if (!selectedProject) {
      return res.status(404).json({
        message: "Proje bulunamadı!",
      });
    }
    res.status(200).json({
      selectedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Beklenmedik bir hata oluştu!",
      error: error.message,
    });
  }
};

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  detailsProject,
};
