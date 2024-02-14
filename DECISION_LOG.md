# This file contain concept decisions for GAD automation framework

## Integration of code style tools in framework

**ID**: 001  
**Status**: Decided  
**Date**: 2023/07/12  
**Context**:
We need static code analysis tools for:

- unified code standard in framework
- better code readability
- easy code formatting actions

**Proposed solution**

- ESLint for linting coding rules for TypeScript files
- Prettier for formatting files
- Husky for running linting scripts

**Pros**: Tools automate formatting and code style maintenance activities

**Cons**: New tools add more complexity to solution and require maintenance

**Decision**: Use Prettier, ESLint and Husky to provide hight code standard
across framework

**ID**: 00
**Status**: Decided
**Date**: 2023/07/26
**Context**: In our automated tests, we often encounter the need to populate test data with realistic but randomized values, such as names, addresses, dates, and other user-specific information.
**Proposed solution**: Integrate the 'faker' library into our automated tests to generate realistic and randomized test data.
**Pros**:

- Realistic test data - The 'faker' library provides a wide range of data generation options, allowing us to create diverse and realistic test scenarios.
- Time-saving - Automating the data generation process with 'faker' significantly reduces the time spent on writing and maintaining test data setup.
- Increased test coverage - By using 'faker,' we can easily create various data combinations, enhancing our test suite's coverage.
  **Cons**:
- Dependency management - We need to ensure that the 'faker' library is correctly installed and managed across our test environments.
- Slower tests - Adding faker slows down test by additional logic and abstraction.
- Random Data Challenges - Random data produced by faker, in some cases can be inappropriate for our needs, that force additional effort to customize faker outputs.
  **Decision**: Decided.

**Creator**: Przemek B
