import User from "../models/User.js";
import EventAttendee from "../models/EventAttendee.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  if (!req.user || req.user.id !== req.params.id) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  if (!req.user || req.user.id !== req.params.id) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const requestedUserId = req.params.id;
    if (req.user.id !== requestedUserId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const registrations = await EventAttendee.find({
      userId: requestedUserId,
    }).populate("eventId");
    const events = registrations.map((reg) => reg.eventId);
    const pastEvents = events.filter(
      (event) => new Date(event.time) < new Date(),
    );

    res.status(200).json({ success: true, result: pastEvents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserUpcomingEvents = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const requestedUserId = req.params.id;
    if (req.user.id !== requestedUserId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const registrations = await EventAttendee.find({
      userId: requestedUserId,
    }).populate("eventId");
    const events = registrations.map((reg) => reg.eventId);
    const upcomingEvents = events.filter(
      (event) => new Date(event.time) > new Date(),
    );

    res.status(200).json({ success: true, result: upcomingEvents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate(
      "friends.friendId",
      "name profilePhoto",
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const sortField =
      req.query.sort === "name" ? "friendId.name" : "friends.addedAt";
    const sortedFriends = user.friends.sort((a, b) => {
      if (sortField === "friendId.name") {
        return a.friendId.name.localeCompare(b.friendId.name);
      } else {
        return b.addedAt - a.addedAt;
      }
    });

    res.status(200).json({ success: true, result: sortedFriends });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
