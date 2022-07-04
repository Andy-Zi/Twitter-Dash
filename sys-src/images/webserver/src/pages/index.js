import Head from 'next/head'
import React from "react";
import Navigation from "../components/Navigation";

export default class Home extends React.Component {
    render() {
        return (
            <div className={"container"}>
                <Head>
                    <title>Twitter Dash</title>
                    <meta name="description" content="Generated by create next app" />
                </Head>

                <Navigation active={"Twitter Dash"}></Navigation>
                <div className={"main"}>
                    <h1>
                        Twitter Dash
                    </h1>
                    <h2>Introduction to Twitter Dash</h2>
                        <p>
                            Welcome to Twitter Dash! Twitter Dash allows you to:
                        </p>
                        <ul>
                            <li>Look at current trends by location</li>
                            <li>Look up the Tweet volume for a certain trend</li>
                            <li>Follow the change in sentiment for a certain trend</li>
                            <li>Display the change in ranking over time</li>
                        </ul>

                    <h2>Technical description of Twitter Dash ...</h2>
                    <p>Usage description of Twitter Dash ...</p>
                    <p>Authors of Twitter Dash ...</p>

                </div>
            </div>
        )
    }

}
