import React from "react";
import Loader from "./Loader";

export default class Loading extends React.Component {
    state = {
        isLoading: false
    }
    startLoading() {
        this.setState({ isLoading: true })
    }
    stopLoading() {
        this.setState({ isLoading: false })
    }
    render(): React.ReactNode {
        if (this.state.isLoading) {
            return (
                <Loader />
            )
        }
    }
}