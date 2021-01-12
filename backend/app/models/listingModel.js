module.exports = (mongoose) => {
  var listingSchema = mongoose.Schema(
    {
      shopName: String,
      itemName: String,
      price: Number,
      available: Boolean,
    },
    { timestamps: true }
  );

  listingSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const listing = mongoose.model("listing", listingSchema);
  return listing;
};
