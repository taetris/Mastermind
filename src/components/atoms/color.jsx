export default function Color(props) {
    
    return (
        <div
            className="color"
            style={{ backgroundColor: props.color, 
                        width: props.size, 
                        height: props.size,
                        borderRadius: "50%",
                        border: props.resetBorder ? "none" : "5px solid #ddd"
             }}
            // onClick={() => props.handleColor(props.color)}
        ></div>
    )
}