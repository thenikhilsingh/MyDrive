const mongoose = require("mongoose");

const folderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shareToken: {
      type: String,
      default: null,
    },

    shareExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Folder", folderSchema);
