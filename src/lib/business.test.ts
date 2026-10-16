import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { BUSINESS, addressLine, postalAddressSchema } from "./business.ts";

describe("BUSINESS constants & utilities", () => {
  test("legalName is defined and correct", () => {
    assert.equal(BUSINESS.legalName, "Ebusadullah Hacamat & Akademi");
  });

  test("addressLine formats canonical address string", () => {
    assert.equal(
      addressLine(),
      "Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4, 42040 Meram/Konya"
    );
  });

  test("postalAddressSchema returns correct Schema.org PostalAddress", () => {
    const schema = postalAddressSchema();
    assert.equal(schema["@type"], "PostalAddress");
    assert.equal(schema.streetAddress, "Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4");
    assert.equal(schema.postalCode, "42040");
    assert.equal(schema.addressLocality, "Meram");
    assert.equal(schema.addressRegion, "Konya");
    assert.equal(schema.addressCountry, "TR");
  });

  test("social links are valid URLs", () => {
    assert.equal(BUSINESS.social.instagram, "https://www.instagram.com/konya_hacamat");
    assert.equal(BUSINESS.social.facebook, "https://www.facebook.com/konyahacamat.com.tr/");
  });
});
