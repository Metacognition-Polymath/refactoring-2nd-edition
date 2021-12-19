
//before
const getLoanInfo = async (encryptParam) => {
  const { validationCode } = await checkValidation({ encryptParam });
  handleInvalid(VALID_CODE[validationCode]);
};

//after
const getLoanInfo = async (encryptParam) => await nfValidation(encryptParam);

const nfValidation = async (encryptParam) => {
  const { validationCode } = await checkValidation({ encryptParam });
  handleInvalid(VALID_CODE[validationCode]);
};