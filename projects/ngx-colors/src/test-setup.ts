// Loads Zone.js and wires it into Vitest so the zone-based Angular test helpers
// (waitForAsync / fakeAsync / TestBed change detection) work under Vitest.
// The karma `test.ts` entry point used to set this up.
// Order matters: zone.js -> zone-testing (provides ProxyZoneSpec) -> vitest patch.
import 'zone.js'
import 'zone.js/testing'
import 'zone.js/plugins/vitest-patch'
