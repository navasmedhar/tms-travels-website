const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^[+\d\s\-()]{7,20}$/, "Invalid mobile number format"],
    },
    pickup: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true,
      maxlength: [200, "Pickup location too long"],
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
      maxlength: [200, "Destination too long"],
    },
    vehicle: {
      type: String,
      required: [true, "Vehicle type is required"],
      trim: true,
      enum: {
        values: [
          "4 Seater Car",
          "7 Seater SUV (Innova/Ertiga)",
          "15 Seater AC Van",
          "20 Seater Van",
          "Tourist Vehicle",
        ],
        message: "{VALUE} is not a valid vehicle type",
      },
    },
    tripType: {
      type: String,
      trim: true,
      enum: {
        values: [
          "",
          "Day Rental",
          "Weekly Rental",
          "Monthly Rental",
          "Family Trip",
          "Honeymoon Trip",
          "Temple Tour",
          "College IV Trip",
          "Friends Group Trip",
          "Corporate Tour",
          "Airport Pickup/Drop",
          "All India Tour",
        ],
        message: "{VALUE} is not a valid trip type",
      },
      default: "",
    },
    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "completed", "cancelled"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Index for common queries
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ travelDate: 1 });
bookingSchema.index({ mobile: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
