export default {
  /**
   * Do not include sass partial files ie. "_some-file" (underscore files)
   */
  skipPartials: true,
  /**
   * Delete data.layout if set in page/files data (cascade)
   * - If you have a default layout set this will cause the output to be wrapped
   *   in the template, this deletes that so it outputs without a layout
   */
  deleteDataLayout: true,
  /**
   * Include the cwd ie "." in sass resolve loadPaths
   */
  addCwd: false,
  /**
   * Include the themes "includes" directory in load paths
   */
  addIncludes: true,
  /**
   * Options to pass to sass compiler (except load paths)
   */
  sass: {},
  /**
   * Optionally modify the result before creating the output file
   * - Could be a way to do something after sass compile (autoprefixer, etc)
   */
  transform: (result, _data) => result.css,
  /**
   * Include extra debug logs
   */
  debug: false,
}