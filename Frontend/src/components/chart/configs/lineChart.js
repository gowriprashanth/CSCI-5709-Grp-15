import axiosHelper from '../../../helper/axioshelper';

const lineChart = {
  series: [
    {
      name: "Created",
      data: [], 
      offsetY: 0,
    },
    {
      name: "Resolved",
      data: [], 
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
          fontSize: "12px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },
    xaxis: {
      labels: {
          fontSize: "2px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c"
          ], 
      },
      categories: [], 
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

const fetchLineChartData = async () => {
  try {
    const response = await axiosHelper.get('/analytics/department');
    const data = response.data.data; 

    const categories = data.map(item => item.team);
    const created = data.map(item => item.created);
    const resolved = data.map(item => item.resolved);

    lineChart.series[0].data = created;
    lineChart.series[1].data = resolved;
    lineChart.options.xaxis.categories = categories;

    return lineChart; 
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; 
  }
};

export { lineChart, fetchLineChartData };
