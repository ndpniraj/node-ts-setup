import Agency from "@/model/agency";
import User from "@/model/user";
import { NewAgencyHandler } from "@/types";

export const registerAgency: NewAgencyHandler = async (req, res) => {
  const { about, name } = req.body;

  await Agency.create({ about, name, owner: req.user.id });
  await User.findByIdAndUpdate(req.user.id, { role: "agency-owner" });
  res.json({ success: true });
};
