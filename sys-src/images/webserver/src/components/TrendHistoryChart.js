import React from "react";
import _ from "lodash";
import {
    Chart as ChartJS,
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    type: 'line',
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Trend History',
        },
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day'
            },
            ticks: {
                sampleSize: 2,
                maxTicksLimit: 7
            }
        },
        y: {
            beginAtZero: true
        }
    },
    elements: {
        line: {
            tension: 0 // disables bezier curves
        }
    }
};

export default class SentimentHistoryChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trendName: props.trendName,
            data: null,
            loading: false,
        }
    }

    fetchData() {
        let query = 'api/GetRecentTrends?' + new URLSearchParams({
            hashtag: this.props.trendName,
            country: this.props.country,
            start_date: this.props.start_date,
            end_date: this.props.end_date
        });
        let fetch_promise = fetch(query);
        let json_promise = fetch_promise.then((res) => res.json())
        json_promise.then((data) => {
            if (!_.isEmpty(data)) {
                this.setState({data})
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props, prevProps)) {
            if (this.props.trendName != null) {
                this.fetchData();
            }
        }
    }

    render() {
        if (!this.props.trendName) return <p>Please enter your search term ...</p>
        if (!this.props.country) return <p>Please select a country ...</p>
        if (!this.state.data) return <p>Hang on ...</p>

        let displayData = this.state.data;

        let labels = displayData.map((obj, index) => {
            return (
                new Date(obj.datetime.seconds * 1000)
            );
        });
        let placements = displayData.map((obj, index) => {
            return (
                obj.trend.placement
            );
        });

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: this.props.trendName,
                    data: placements,
                    borderColor: 'rgb(29, 155, 240)',
                    backgroundColor: 'rgba(29, 155, 240, 0.5)',
                }
            ]
        }

        return (<Line options={options} data={chartData} />);
    }

}