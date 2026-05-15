import { Billing } from "./services/billing.js";
import { User } from "./models/user.js";
import { Call } from "./models/call.js";
import {
    LocalPricing,
    NationalPricing,
    InternationalPricing,
} from "./rates/pricing.js";
import { LocalCall } from "./models/local-call.js";
import { NationalCall } from "./models/national-call.js";
import { InternationalCall } from "./models/international-call.js";

const localPricing = new LocalPricing(0.2, 0.1, 0.1);

const nationalPricing = new NationalPricing({
    Córdoba: 0.15,
    Rosario: 0.18,
    Mendoza: 0.2,
});

const internationalPricing = new InternationalPricing({
    Brasil: 0.5,
    España: 0.8,
    USA: 1.0,
});

const calls: Call[] = [
    new LocalCall(
        1,
        new Date("2026-05-01T10:00:00"),
        new Date("2026-05-01T10:30:00"),
        localPricing.PEAK_HOUR_START,
        localPricing.PEAK_HOUR_END,
        localPricing.getpeakHourCost(),
        localPricing.getoffHoursCost(),
        localPricing.getWeekendCost(),
    ),
    new LocalCall(
        2,
        new Date("2026-05-03T22:00:00"),
        new Date("2026-05-03T22:20:00"),
        localPricing.PEAK_HOUR_START,
        localPricing.PEAK_HOUR_END,
        localPricing.getpeakHourCost(),
        localPricing.getoffHoursCost(),
        localPricing.getWeekendCost(),
    ),
    new LocalCall(
        3,
        new Date("2026-05-04T12:00:00"),
        new Date("2026-05-04T12:15:00"),
        localPricing.PEAK_HOUR_START,
        localPricing.PEAK_HOUR_END,
        localPricing.getpeakHourCost(),
        localPricing.getoffHoursCost(),
        localPricing.getWeekendCost(),
    ),
    new LocalCall(
        4,
        new Date("2026-04-20T19:45:00"),
        new Date("2026-04-20T20:30:00"),
        localPricing.PEAK_HOUR_START,
        localPricing.PEAK_HOUR_END,
        localPricing.getpeakHourCost(),
        localPricing.getoffHoursCost(),
        localPricing.getWeekendCost(),
    ),
    new NationalCall(
        5,
        new Date("2026-05-06T09:00:00"),
        new Date("2026-05-06T09:45:00"),
        "Córdoba",
        nationalPricing,
    ),
    new NationalCall(
        6,
        new Date("2026-05-10T15:00:00"),
        new Date("2026-05-10T15:30:00"),
        "Rosario",
        nationalPricing,
    ),
    new InternationalCall(
        7,
        new Date("2026-05-12T11:00:00"),
        new Date("2026-05-12T11:20:00"),
        "Brasil",
        internationalPricing,
    ),
    new InternationalCall(
        8,
        new Date("2026-05-13T18:00:00"),
        new Date("2026-05-13T18:10:00"),
        "USA",
        internationalPricing,
    ),
];

const user = new User(1, "Eduardo Emanuel Cabral", calls);
const billing = new Billing(50);
const callCosts = billing.calculateCallCosts(user);
const totalCost = billing.calculateTotalCost(user);

console.log(`
---Factura--- 
Cliente: ${user.getName()}
Abono básico: $${billing.getBasicSubscription().toFixed(2)}
Llamadas locales: $${callCosts.local.toFixed(2)}
Llamadas nacionales: $${callCosts.national.toFixed(2)}
Llamadas internacionales: $${callCosts.international.toFixed(2)}
Total a pagar: $${totalCost.toFixed(2)}
`);
