import React, { useEffect, useRef, useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  stackedbarContainer: {
    boxSizing: 'border-box',
    maxHeight: '600px',
    boxShadow: 'none',
  },
  legendContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    padding: '16px'
  },
  legend: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginRight: '32px'
  },
  pointer: {
    width: '18px',
    height: '8px',
    borderRadius: '8px',
    marginRight: '10px',
    marginBottom: '2px'
  }
}));

export function StackedBar() {
  const chartRef = useRef(null);

  const classes = useStyles();

  const [mappedLegends, setMappedLegends] = useState([]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: true,
    legend: { display: false },
    cornerRadius: 20,
    tooltips: {
      cornerRadius: 8,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: '#D2D2D2',
      backgroundColor: '#FFF',
      titleFontColor: '#757575',
      titleSpacing: 2,
      bodyFontColor: '#000000DE',
      bodyFontSize: 13,
      bodyFontFamily: 'Open sans, sans-serif',
      bodySpacing: 10,
      footerFontColor: '#289E45',
      xPadding: 16,
      yPadding: 10,
      // Disable the on-canvas tooltip
      enabled: false,
      custom: function(tooltipModel) {
        // Tooltip Element
        let tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel) {
            const titleLines = tooltipModel.title || [];
            const bodyLines = tooltipModel.body;

            let innerHtml = '<thead>';

            titleLines.forEach(function(title) {
              innerHtml += '<tr><th>' + title + '</th></tr>';
            });
            innerHtml += '</thead><tbody>';

            // Set Text
            if (tooltipModel.body) {
              const titleLines = tooltipModel.title || [];
              const bodyLines = tooltipModel.body.map(getBody);

              let innerHtml = '<thead>';

              titleLines.forEach(function(title) {
                innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';

              bodyLines.forEach(function(body, i) {
                const colors = tooltipModel.labelColors[i];
                let style = 'background:' + colors.borderColor;
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 2px';
                const span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                const label = body[0].split(':');
                if(label[0] !== 'line') {
                  innerHtml += '<tr><td>' + span + body + '</td></tr>';
                }
              });
              innerHtml += '</tbody>';

              const tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            const positionY = this._chart.canvas.offsetTop;
            const positionX = this._chart.canvas.offsetLeft;

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = positionX + tooltipModel.caretX + 'px';
            tooltipEl.style.top = positionY + tooltipModel.caretY + 'px';
            tooltipEl.style.fontFamily = tooltipModel._fontFamily;
            tooltipEl.style.fontSize = tooltipModel.fontSize;
            tooltipEl.style.fontStyle = tooltipModel._fontStyle;
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
          }

          // `this` will be the overall tooltip
          const position = this._chart.canvas.getBoundingClientRect();

          // Display, position, and set styles for font
          tooltipEl.style.opacity = 1;
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
          tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
          tooltipEl.style.pointerEvents = 'none';
        }
      },
      legend: {
        display: false,
        position: 'bottom',
        // labels: {
        //   boxWidth: 30,
        //   fontColor: '#333',
        //   filter: function(labelItem) {
        //     const labels = ['Nett', 'Gross', 'Unit per Transaction', 'Average Purchase Value'];
        //     if (labels.indexOf(labelItem.text) > -1) return true;
        //   }
        // }
        legendCallback: function(chart) {
          const ul = document.createElement('ul');
          const borderColor = chart.data.datasets[0].borderColor;
          chart.data.labels.forEach(function(label, index) {
             ul.innerHTML += `
               <li>
                  <span style="background-color: ${borderColor[index]}"></span>
                   ${label}
                </li>
             `;
          });
          return ul.outerHTML;
       },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            barPercentage: 0.5,
            categoryPercentage: 0.5
          }]
        }
      },
      layout: { padding: 0 },
      scales: {
        xAxes: [
          {
            stacked: true,
            barThickness: 25,
            maxBarThickness: 35,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
            ticks: {
              fontColor: '#43425D'
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              fontColor: '#43425D',
              beginAtZero: true,
              min: 0
            },
            gridLines: {
              borderDash: [0],
              borderDashOffset: [0],
              color: '#EAF0F4',
              drawBorder: false,
              zeroLineBorderDash: [0],
              zeroLineBorderDashOffset: [0],
              zeroLineColor: '#EAF0F4'
            }
          }
        ]
      }
    }

    const data = {
      labels: ['Jan 12', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Nett',
          backgroundColor: '#37B04C',
          borderColor: '#37B04C',
          data: [18000, 23000, 19000, 27000, 29000, 23000, 15000],
          order: 3
        },
        {
          label: 'Gross',
          backgroundColor: '#289E45',
          borderColor: '#289E45',
          data: [11000, 20000, 12000, 29000, 30000, 25000, 13000],
          order: 2
        },
        {
          label: 'Average Purchase Value',
          backgroundColor: 'transparent',
          borderColor: '#6BE681',
          data: [9000, 20000, 20000, 29000, 30000, 19, 15000],
          order: 4,
        },
        {
          label: 'Unit per Transaction',
          backgroundColor: 'transparent',
          borderColor: '#707070',
          data: [9000, 21000, 12000, 29000, 30000, 25000, 13000],
          order: 5,
        },
        {
          label: 'line',
          borderColor: '#FFE854',
          pointBackgroundColor: '#FFFFFF',
          pointBorderWidth: 4,
          pointHoverBorderWidth: 5,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '#FFE854',
          backgroundColor: 'transparent',
          data: [9000, 21000, 12000, 29000, 30000, 25000, 13000],
          type: 'line',
          fill: true,
          order: 1
        }
      ]
    }


    useEffect(() => {
      if(chartRef) {
        const legends = chartRef.current.chartInstance.legend.legendItems;
        if(legends.length > 0) {
          const templates = legends.filter(l => l.text !== 'line').map(l => {
            return (
              <Grid key={l.text} className={classes.legend}>
                <span className={classes.pointer} style={{backgroundColor: l.strokeStyle}}></span>
                <Typography variant='caption' color='initial'>{l.text}</Typography>
              </Grid>
            )
          });
          setMappedLegends(templates);
        }
      }
    }, []);

  return (
    <Card className={classes.stackedbarContainer}>
      <Bar
        ref={chartRef}
        data={data}
        options={options}
      />
      <Grid className={classes.legendContainer}>
        {mappedLegends}
      </Grid>
    </Card>
  );
}
