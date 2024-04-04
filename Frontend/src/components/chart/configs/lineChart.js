import axiosHelper from '../../../helper/axioshelper';

// Define the lineChart object
const lineChart = {
  series: [
    {
      name: "Created",
      data: [], // Initialize with empty array
      offsetY: 0,
    },
    {
      name: "Resolved",
      data: [], // Initialize with empty array
      offsetY: 0,
    },
  ],
  options: {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [], // Initialize with empty array
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

// Make a GET request to the API endpoint
axiosHelper.get('/analytics/department')
  .then(response => {
    // Extract the data from the response
    const data = response.data;

    // Extract created and resolved data
    const createdData = data.filter(item => item.name === "Created").map(item => item.created);
    const resolvedData = data.filter(item => item.name === "Resolved").map(item => item.resolved);

    // Extract categories
    const categories = data.map(item => item.categories);

    // Update the lineChart object with the fetched data
    lineChart.series[0].data = createdData;
    lineChart.series[1].data = resolvedData;
    lineChart.options.xaxis.categories = categories;

    // You can render your chart here or do any other processing with the data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Export the lineChart object
export default lineChart;
