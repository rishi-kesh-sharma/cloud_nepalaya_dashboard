import React from "react";
import ReactApexChart from "react-apexcharts";
// import ReactApexChart from "apexcharts";
const PieChart = ({ items }) => {
  let getLabels = () => {
    let labels = items?.map((item) => {
      return item?.service?.title;
    });
    labels = new Set(labels);

    labels = [...labels];
    labels = labels.filter(function (element) {
      return element !== undefined;
    });
    return labels;
  };
  let getCounts = () => {
    let counts = [];
    labels?.forEach((label, index) => {
      items?.forEach((item) => {
        // console.log(item);
        if (item?.service?.title == label) {
          console.log(label);
          counts[index] = (counts[index] || 0) + 1;
        }
      });
    });
    console.log(counts);
    return counts;
  };

  let labels = getLabels();
  let counts = getCounts();
  console.log(counts);

  let data = {
    series: counts,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div id="chart">
      <br />
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="pie"
        width={500}
      />
    </div>
  );
};

export default PieChart;
