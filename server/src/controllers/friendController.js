import User from "../models/User.js";

export const addFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const friend = user.friends.find(
      (item) => item.friendId.toString() === friendId,
    );
    if (friend) {
      return res
        .status(400)
        .json({ success: false, message: "Friend already added" });
    }

    user.friends.push({ friendId });
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Friend added successfully" });
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

export const removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.friends = user.friends.filter(
      (item) => item.friendId.toString() !== friendId,
    );
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Friend removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkFriendship = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isFriend = user.friends.some(
      (friend) => friend.friendId.toString() === friendId,
    );

    res.status(200).json({ success: true, isFriend });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
