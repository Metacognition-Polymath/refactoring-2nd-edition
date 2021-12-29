
let result = false;
const availableResources = [1,2];
const allocatedResources = []

if (availableResources.length === 0) {
  result = createResource();
} else {
  result = availableResources.pop();
}

allocatedResources.push(result);

module.exports =  {
    result : result,
    allocatedResources: allocatedResources
}
