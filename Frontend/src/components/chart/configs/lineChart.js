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
    const data = response.data;

const createdData = data.filter(item => item.name === 'Created').map(item => item.created);
const resolvedData = data.filter(item => item.name === 'Resolved').map(item => item.resolved);
const categories = data.map(item => item.categories);

lineChart.series[0].data = createdData;
lineChart.series[1].data = resolvedData;
lineChart.options.xaxis.categories = categories;

return lineChart; 
    
  } catch (error) {
    console.error('Error fetching data:', error);
return null; 
  }
};

export { lineChart, fetchLineChartData };
