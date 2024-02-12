import React from "react";
import Loader from "./Loader";
import { hideScrollbar, showScrollbar } from "../../lib/utils";

export default class Loading extends React.Component {
    state = {
        isLoading: false
    }
    startLoading() {
        hideScrollbar()
        this.setState({ isLoading: true })
    }
    stopLoading() {
        showScrollbar()
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