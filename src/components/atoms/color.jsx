export default function Color(props) {
    
    return (
        <div
            className="color"
            style={{ backgroundColor: props.color, 
                        width: props.size, 
                        height: props.size,
                        borderRadius: "50%",
                        
             }}
            // onClick={() => props.handleColor(props.color)}
        ></div>
    )
}