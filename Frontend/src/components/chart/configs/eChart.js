import axiosHelper from '../../../helper/axioshelper';

// Define the eChart object
const eChart = {
  series: [
    {
      name: "Tickets",
      data: [], 
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
      categories: [], 
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

const fetchEChartData = async () => {
  try {
    const response = await axiosHelper.get('/analytics/ticket');
    const data = response.data;
const chartData = data.map(item => item.value);
const categories = data.map(item => item.month);

// Update the eChart object with the fetched data
eChart.series[0].data = chartData;
eChart.options.xaxis.categories = categories;

return eChart;
  } catch (error) {
    console.error('Error fetching eChart data:', error);
return null;
  }
};


export {eChart, fetchEChartData};
