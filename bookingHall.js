const booking_ids = [
  // {
//   booking_id: "",
//   hall_id: 1,
//   booked_at: ["start time", "end time"],
//   customer_id: "id",
// },
// {
//   booking_id: "",
//   hall_id: 2,
//   booked_at: ["start time", "end time"],
//   customer_id: "id",
// },
// {
//   booking_id: "",
//   hall_id: 3,
//   booked_at: ["start time", "end time"],
//   customer_id: "id",
// },

];
const customer_ids = [
  {
    customer_id: 1,
    customer_name: "name",
    customer_address: "address",
    booked_id:'',
  }
];
const hall_ids = [
  {
    hall_id: 1,
    available_now:false,
    hall_size: "w*l*b",
    stage_size: "w*l*b",
    seats: 50,
    price_per_hour: "1500",
    Address: "address",
  },
  {
    hall_id: 2,
    available_now:false,
    hall_size: "w*l*b",
    stage_size: "w*l*b",
    seats: 50,
    price_per_hour: "1500",
    Address: "address",
  },
  {
    hall_id: 3,
    available_now:false,
    hall_size: "w*l*b",
    stage_size: "w*l*b",
    seats: 50,
    price_per_hour: "1500",
    Address: "address",
  },
  {
    hall_id: 4,
    available_now:false,
    hall_size: "w*l*b",
    stage_size: "w*l*b",
    seats: 50,
    price_per_hour: "1500",
    Address: "address",
  },
  {
    hall_id: 5,
    available_now:false,
    hall_size: "w*l*b",
    stage_size: "w*l*b",
    seats: 80,
    price_per_hour: "3000",
    Address: "address",
  }
];
const booking_history = [/* ... */];

setInterval(() => {
  const checkout = booking_ids.filter((booked) => new Date(booked.booked_at[1]) < Date.now());

  checkout.forEach((hall) => {
    let customer = booking_history.find((history) => history.customer_id === hall.customer_id);

    if (customer) {
      // Create a new history entry instead of pushing to existing booked_lists
      const newHistory = {
        customer_id: hall.customer_id,
        booked_lists: [
          {
            hall_id: hall.hall_id,
            booking_id: hall.booking_id,
            booking_status: "checked_out",
            start_time: hall.booked_at[0],
            end_time: hall.booked_at[1],
          },
        ],
      };
      booking_history.push(newHistory);
    } else {
      // Create a new history entry for the customer
      const newHistory = {
        customer_id: hall.customer_id,
        booked_lists: [
          {
            hall_id: hall.hall_id,
            booking_id: hall.booking_id,
            booking_status: "checked_out",
            start_time: hall.booked_at[0],
            end_time: hall.booked_at[1],
          },
        ],
      };
      booking_history.push(newHistory);
    }
  });

  // Update availability with correct time comparisons
  hall_ids.forEach((hall) => {
    hall.available_now = !booking_ids.some((booking) =>
      booking.hall_id === hall.hall_id &&
      new Date(booking.booked_at[0]) <= Date.now() &&
      Date.now() <= new Date(booking.booked_at[1])
    );
  });
}, 60000 * 30);

module.exports = {
  booking_ids,
  customer_ids,
  hall_ids,
  booking_history,
};
