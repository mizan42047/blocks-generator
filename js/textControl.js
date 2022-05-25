const TextControl = ({label,defaultText}) => {
    let text = `shopengine_title_heading_input": {
        "control": {
            "field": "TextareaControl",
            "props": {
                "label": "${label}"
            }
        },
        "responsive": false,
        "type": "object",
        "default": {
            "desktop": "${defaultText}"
        }
    }`;

   return $('#generate-code').text(text);
}


export default TextControl;