const blockName = $('#block-name');
const blockLabel = $('#block-label');
const blockField = $('#block-field');
const defaultValue = $('#default-value');
const optionLabel = $('#optionLabel');
const optionValue = $('#optionValue');

$(blockField).change(function (e) {
    let wrapper_find = blockField.val().match(/Panel|Tab|Popover/g);
    if (wrapper_find !== null) {
        $('.gutenova input').hide();
        defaultValue.hide();
        $('#block-name').show();
        $('#block-label').show();
        $('#generate').show();
        
    } else {
        defaultValue.show();
        $('.gutenova input').show();
        
    }

    if (blockField.val() === 'FontfamilyControl') {
        defaultValue.hide();
    } else {
        defaultValue.show();
    }

    if (blockField.val() === 'SelectControl' || blockField.val() === 'ColorPalette') {
        $('#optionLabel,#optionValue').show();
    } else {
        $('#optionLabel,#optionValue').hide();
    }
});

const codeGenerate = ({ name, label, field, optionLabel, optionValue, defaultText }) => {
    var key = '';
    switch (field) {
        case 'SelectControl':
            key = 'options'
            break;
        case 'ColorPalette':
            key = 'colors'
    }
    let extraOption = `
    "isPressEnterToChange" : true,
    "units" : [
        {"value" : "px" , "label" : "px" , "default" : 0}
    ]
    `
    let unitControl = `
    "${name}": {
        "control": {
            "field": "${field}",
            "props": {
                "label": "${label}",
                    ${field === '__experimentalUnitControl' && extraOption}
            }
        },
        "responsive": true,
        "type": "object",
        "default": {
            "desktop": "${defaultText}${field === '__experimentalUnitControl' && "px"}"
        }
    },
    `;

    let boxControl = `
    "${name}": {
        "control": {
            "field": "${field}",
            "props": {
                "label": "${label}",
                "allowReset" : true
            }
        },
        "type": "object",
        "responsive": true,
        "default": {
            "desktop": {
                "top": "",
                "right": "",
                "bottom": "",
                "left": ""
            }
        }
    },
    `

    let toggle = `
    "${name}": {
        "control": {
            "field": "${field}",
            "label": "${label}",
            "props": {
                "checked": ${defaultText}
            }
        },
        "type": "object",
        "default": {
            "desktop": ${defaultText}
        }
    },
    `;

    let fontFamily = `"${name}": {
        "control": {
            "field": "${field}",
            "label": "${label}"
        },
        "type": "object",
    },
    
    `;

    let withOptions = `"${name}": {
        "control": {
            "field": "${field}",
            "props": {
                "label": "${label}",
                "${key}" : [
                    {
                        "label" : "${optionLabel}",
                        "value" : "${optionValue}"
                    }
                ]
            }
        },
        "responsive": false,
        "type": "object",
        "default": {
            "desktop": "${defaultText}"
        }
    },

    `
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

    if (wrapper_find !== null) {
        $('#generate-code').append(wrapper_start);
        $('#generate-code').append(wrapper_end);
    } else if (field === 'SelectControl' || field === 'ColorPalette') {
        $('#generate-code').append(withOptions);
    } else if ((field === 'FontfamilyControl')) {
        $('#generate-code').append(fontFamily);
    } else if (field === '__experimentalUnitControl') {
        $('#generate-code').append(unitControl);
    } else if (field === 'ToggleControl') {
        $('#generate-code').append(toggle);
    } else if (field === '__experimentalBoxControl') {
        $('#generate-code').append(boxControl);
    } else {
        $('#generate-code').append(text);
    }
}


$("#generate").on('click', (event) => {
    event.preventDefault();
    const makeBlock = {
        name: blockName.val(),
        label: blockLabel.val(),
        field: blockField.val(),
        optionLabel: optionLabel.val(),
        optionValue: optionValue.val(),
        defaultText: defaultValue.val()
    }


    codeGenerate(makeBlock);
})





$('#copy-code').on('click', function () {
    let code = $('#generate-code').text();

    if (code.trim().length === 0) {
        return;
    } else {
        navigator.clipboard.writeText(code);
    }
});








