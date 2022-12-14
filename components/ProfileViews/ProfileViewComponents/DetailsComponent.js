import {TextInput} from "react-native";
import Styles from "../../../globalStyles/Styles";
import {formatDayOrMonth} from "../../helperfunctions";
import React from "react";

//Funksjon details
function DetailsComponent (props) {
    return <>
        <TextInput
            value={props.globalUser.firstname}
            placeholder={props.globalUser.firstname}
            style={Styles.inputV2}
            editable={false}
        />
        <TextInput
            value={props.globalUser.lastname}
            placeholder={props.globalUser.lastname}
            style={Styles.inputV2}
            editable={false}
        />
        <TextInput
            value={formatDayOrMonth(props.globalUser.birtDate) + "-" + formatDayOrMonth(props.globalUser.birthMonth) + "-" + props.globalUser.birthYear}
            placeholder={formatDayOrMonth(props.globalUser.birtDate) + "-" + formatDayOrMonth(props.globalUser.birthMonth) + "-" + props.globalUser.birthYear}
            style={Styles.inputV2}
            editable={false}
        />
    </>;
}
//Eksporter
export default DetailsComponent;