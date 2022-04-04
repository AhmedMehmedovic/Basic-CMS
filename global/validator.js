const Validator = (function () {
  let errors = [];

  let validators = {
    min: function (value, element) {
      let currentValue = parseFloat(element.value);
      if (parseFloat(value) < currentValue || isNaN(currentValue)) {
        _setError("Vrijednost mora biti veća od " + parseFloat(value));
      }
    },
    minlength: function (valueRule, element) {
      let currentValue = element.value.length;
      console.log(valueRule + " - " + currentValue);
      if (valueRule > currentValue) {
        _setError("Dužina mora biti veća od " + parseInt(valueRule));
      }
    },
    email: function (value, element) {
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!element.value.match(mailformat)) {
        _setError("Unesi ispravan format email adrese");
      }
    },
  };

  let _setError = function (message) {
    errors.push(message);
  };

  const getAllFormElements = function (form) {
    return Array.from(form.elements).filter((tag) =>
      ["select", "textarea", "input"].includes(tag.tagName.toLowerCase())
    );
  };

  let _validate = function (element) {
    let allInputs = getAllFormElements(element);

    for (let index = 0; index < allInputs.length; index++) {
      let datasets = allInputs[index].dataset;

      for (const [key, value] of Object.entries(datasets)) {
        if (key.startsWith("validator")) {
          let rule = key.replace(/^(validator)/, "").toLowerCase();
          if (typeof validators[rule] !== "undefined") {
            validators[rule](value, allInputs[index]);
          } else {
            console.warn("Pravilo nije definisano: " + rule);
          }
        }
      }
    }
  };

  return {
    validate: _validate,
    valid: function () {
      return errors.length === 0;
    },
    errors: function (restart = true) {
      let tempErrors = errors;
      if (restart) {
        errors = [];
      }
      return tempErrors;
    },
  };
})(); /*

/*
////Html pozivanje
data-validator-min="5"
data-validator-min-length="2"
data-validator-email="true"
 data-validator-test="true"
                    //
                    <script src="../global/validator.js"></script>
                    
                    Validator.validate(document.getElementById("formaDetaljRacuna"));

                    console.log(Validator.valid());
                    console.log(Validator.errors());
                    */
