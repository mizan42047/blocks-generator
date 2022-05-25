const blockName = $('#block-name');
const blockLabel = $('#block-label');
const blockField = $('#block-field');
const defaultValue = $('#default-value');

const codeGenerate = ({name,label,field,defaultText}) => {
    let text = `"${name}": {
        "control": {
            "field": "${field}",
            "props": {
                "label": "${label}"
            }
        },
        "responsive": false,
        "type": "object",
        "default": {
            "desktop": "${defaultText}"
        }
    },

    `;

    let wrapper_start = `
        "${name}_start":{
            "type":"${field}",
            "label":"${label}"
        },
    `;

    let wrapper_end = `
    
    "${name}_end":{
        "type":"${field}",
        "label":"${label}"
    },
    
    `;

    let wrapper_find = field.match(/Panel|Tab|Popover/g);

    if(wrapper_find !== null) {
        $('#generate-code').append(wrapper_start);
        $('#generate-code').append(wrapper_end);
    }else{
        $('#generate-code').append(text);
    }
}


$("#generate").on('click',(event) => {
    event.preventDefault();
    const makeBlock = {
        name : blockName.val(),
        label: blockLabel.val(),
        field : blockField.val(),
        defaultText : defaultValue.val()
    }

    codeGenerate(makeBlock);

})