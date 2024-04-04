import axiosHelper from '../../../helper/axioshelper';

// Define the eChart object
const eChart = {
  series: [
    {
      name: "Tickets",
      data: [], // Initialize with empty array
      color: "#fff",
    },
  ],
  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [], // Initialize with empty array
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

// Make a GET request to the API endpoint
axiosHelper.get('/analytics/ticket')
  .then(response => {
    // Extract the data and categories from the response
    const data = response.data;
    const chartData = data.map(item => item.value);
    const categories = data.map(item => item.month);

    // Update the eChart object with the fetched data
    eChart.series[0].data = chartData;
    eChart.options.xaxis.categories = categories;

    // You can render your chart here or do any other processing with the data
  })
  .catch(error => {
    console.error('Error fetching chart data:', error);
  });

// Export the eChart object
export default eChart;
