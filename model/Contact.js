// import {model, Schema} from "mongoose"

import pkg from "mongoose";

const { model, Schema } = pkg;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// contactSchema.virtual("status").get(function () {
//   if (this.age >= 40) {
//     return "old";
//   }
//   return "young";
// });

const Contact = model("contact", contactSchema);

export default Contact;
