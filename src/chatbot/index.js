
import React, {Component} from "react";

class Chatbox extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        (function(d, m){
            var kommunicateSettings = {"appId":"304fe50a0b06d8ef5d255d2334d24916d","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
          })(document, window.kommunicate || {});
    }
    render (){
        return(
            <div></div>
        )
    }
}

export default Chatbox;

