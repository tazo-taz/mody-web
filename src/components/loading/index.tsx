import React from "react";

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
                <div className="fixed inset-0 z-50 bg-[#0000003b] flex items-center justify-center">
                    <img src="https://i.gifer.com/ZKZg.gif" width={40} alt="loading" />
                </div>
            )
        }
    }
}