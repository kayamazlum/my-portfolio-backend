const moment = require("moment");
const Projects = require("../models/projects");

const getProjects = async (req, res) => {
  try {
    let projects = await Projects.find().sort({
      created_at: -1,
    });
    if (!projects.length) {
      return res.status(200).json({
        message: "Henüz bir proje eklenmedi!",
      });
    }

    projects = projects.map((project) => ({
      ...project._doc,
      cretaed_at: moment(project.created_at).format("DD/MM/YYYY HH:mm:ss"),
      updated_at: moment(project.updated_at).format("DD/MM/YYYY HH:mm:ss"),
    }));

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
    const { _id, deleted_images = "" } = req.body;
    if (!_id) {
      return res.status(404).json({
        message: "Item bulunamadı!",
      });
    }

    let imageUrls = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const oldData = await Projects.findById(_id);
    if (!oldData) {
      return res.status(404).json({
        message: "Proje bulunamadı!",
      });
    }

    if (oldData.image_url) {
      imageUrls = imageUrls.concat(oldData.image_url);
    }

    const deletedImages = deleted_images ? deleted_images.split(",") : [];
    const lastImage = imageUrls.filter(
      (image) => !deletedImages.includes(String(image))
    );

    const updateData = {
      title: req.body.title || oldData.title,
      summary: req.body.summary || oldData.summary,
      content: req.body.content || oldData.content,
      skills: req.body.skills ? req.body.skills.split(",") : oldData.skills,
      site_url: req.body.site_url || oldData.site_url,
    };

    if (lastImage.length > 0) {
      updateData.image_url = lastImage;
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
    const projects = await Projects.find();
    res.status(200).json({
      message: "Proje başarıyla silindi!",
      projects,
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
    let selectedProject = await Projects.findById(_id);
    if (!selectedProject) {
      return res.status(404).json({
        message: "Proje bulunamadı!",
      });
    }

    selectedProject = {
      ...selectedProject._doc,
      created_at: moment(selectedProject.created_at).format(
        "DD/MM/YYYY HH:mm:ss"
      ),
      updated_at: moment(selectedProject.updated_at).format(
        "DD/MM/YY HH:mm:ss"
      ),
    };

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
