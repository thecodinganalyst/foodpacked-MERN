module.exports = (mongoose) => {
  const foodItemSchema = mongoose.Schema(
    {
      shopName: String,
      itemName: String,
      price: Number,
      available: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const foodItem = mongoose.model("FoodItem", foodItemSchema);
  return foodItem;
};
