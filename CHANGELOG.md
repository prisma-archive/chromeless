# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]

### Added
- `placeholder()` API method [#000](https://github.com/graphcool/chromeless/pull/000) @contributor
- `clearInput()` API method [#151](https://github.com/graphcool/chromeless/pull/151), [#133](https://github.com/graphcool/chromeless/issues/133) @criticalbh
- `setViewport()` API method [#115](https://github.com/graphcool/chromeless/pull/115) @joeyvandijk

### Changed
- **Breaking:** We renamed `cookiesClear()` to `deleteCookies()`, `cookiesClearAll()` to `clearCookies()` and according to semver should bump the version to 2.0.0, however, just-this-time, we're not going to. [#123](https://github.com/graphcool/chromeless/pull/123) @joeyvandijk

### Fixed
- Chromeless can now be imported into TypeScript projects with activated `strictNullChecks` compiler option [#154](https://github.com/graphcool/chromeless/pull/154) @clebert
- Fixed an issue in `clearCookies()` to check that it can clear cookies before trying to clear them [#123](https://github.com/graphcool/chromeless/pull/123) @joeyvandijk


## [1.1.0] - 2017-08-02

### Added
- When using Chromeless locally, Chromeless will now boot Chrome automatically [#120](https://github.com/graphcool/chromeless/pull/120) @joelgriffith
- `html()` and `setHtml()` API methods for getting and setting HTML [#112](https://github.com/graphcool/chromeless/pull/112), [#74](https://github.com/graphcool/chromeless/issues/74) @seangransee
- `mousedown()` and `mouseup()` API methods [#118](https://github.com/graphcool/chromeless/pull/118) @criticalbh
- `focus()` API method [#132](https://github.com/graphcool/chromeless/pull/132) @criticalbh
- `pdf()` API method [#84](https://github.com/graphcool/chromeless/pull/84) @seangransee
- `setUserAgent()` API method to set the user-agent [#117](https://github.com/graphcool/chromeless/pull/117) @joeyvandijk
- CODE_OF_CONDUCT.md, CONTRIBUTING.md

### Changed
- CDP options now get passed to `CDP.New()` [#103](https://github.com/graphcool/chromeless/pull/103) @liady
- `.evaluate()` now returns the resulting value or a Promise [#110](https://github.com/graphcool/chromeless/pull/110) @joelgriffith
- README improvements. @timsuchanek @adieuadieu @hax @Chrisgozd @githubixx @d2s @vladgolubev

### Fixed
- Ensure latest version of Serverless is used during deployment. [#58](https://github.com/graphcool/chromeless/issues/58) @adieuadieu
- package repository url [#64](https://github.com/graphcool/chromeless/pull/64) @Hazealign
- Spelling and minor bugfix when Chromeless calls Version in CPD [#120](https://github.com/graphcool/chromeless/pull/120) @joelgriffith


## [1.0.1] - 2017-07-27
### Added
- CHANGELOG.md
- LICENSE file (MIT)
- `implicitWait`: By default wait for `.press` and `.click` for a cleaner workflow

### Changed
- `.end()`: now returns the last value

### Fixed
- The cookie commands broke the queue, now they work like expected

### Changed
- Many README improvements. @schickling @sorenbs @emeth- @timsuchanek @adieuadieu @toddwprice


## [1.0.0] - 2017-07-26
### Added
- Initial public release
- Initial version of Chromeless
- Initial version of Chromeless Proxy
