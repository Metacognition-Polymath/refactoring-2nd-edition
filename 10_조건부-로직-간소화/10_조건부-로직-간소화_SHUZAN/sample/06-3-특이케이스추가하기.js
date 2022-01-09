/**
 * 변화 단계를 추가하면, 같은 아이디어를 레코드에 적용할 수 있다.
 */

const RECORDS = [
  {
    name: "애크미 보스턴",
    location: "Malden MA",
    customer: {
      name: "애크미 산업",
      billingPlan: "plan-451",
      paymentHistory: {
        weeksDelinquentInLastYear: 7,
      },
    },
  },
  {
    name: "물류창고 15",
    location: "Malden MA",
    customer: "unknown",
  },
];

const registry = { billingPlans: { basic: "" } };
const acquireSiteData = () => RECORDS[0];
const isUnknown = (customer) => (customer.isUnknown === "unknown" ? true : customer.isUnknown);

const client1 = () => {
  const rawSite = acquireSiteData();
  const enrichSite = (aSite) => {
    const result = JSON.parse(JSON.stringify(aSite));
    const unKnowCustomer = {
      isUnknown: true,
      name: "occupant",
      billingPlans: registry.billingPlans.basic,
      paymentHistory: {
        weeksDelinquentInLastYear: 0,
      },
    };
    if (isUnknown(result.customer)) return unKnowCustomer;
    else result.customer.isUnknown = false;
    return result;
  };

  const site = enrichSite(rawSite); //깊은 복사수행
  const customer = site.customer;
  //...
  const customerName = customer.name;
};
const client2 = () => {
  const plan = customer.billingPlan;
};
const client3 = () => {
  const weeksDelinquent = customer.paymentHsitry.weeksDelinquentInLastYear;
};
