<?php

/* vim: set noexpandtab tabstop=4 shiftwidth=4 foldmethod=marker: */

require_once 'Swat/SwatHtmlHeadEntrySet.php';
require_once 'Swat/SwatJavaScriptHtmlHeadEntry.php';

/**
 * Gets a HTML head entry set for using jQuery UI
 *
 * @package   JQuery
 * @copyright 2015 silverorange
 * @license   http://www.opensource.org/licenses/mit-license.html MIT License
 */
class JQueryUI
{
	//  {{{ class constants

	/**
	 * The current jQuery UI version. Update this when updating the bundled
	 * version.
	 */
	const VERSION = '1.11.4';

	// }}}
	// {{{ protected properties

	/**
	 * Static collection of head entries
	 *
	 * @var SwatHtmlHeadEntrySet
	 */
	protected static $html_head_entries = null;

	// }}}
	// {{{ public function getHtmlHeadEntrySet()

	/**
	 * Gets the HTML head entries needed for jQuery UI
	 *
	 * @return SwatHtmlHeadEntrySet the HTML head entries needed for jQuery UI.
	 */
	public function getHtmlHeadEntrySet()
	{
		if (!self::$html_head_entries instanceof SwatHtmlHeadEntrySet) {
			$filename = sprintf('jquery-ui-custom-%s.js', self::VERSION);
			self::$html_head_entries = new SwatHtmlHeadEntrySet();
			self::$html_head_entries->addEntry(
				new SwatJavaScriptHtmlHeadEntry(
					'packages/jquery/javascript/'.$filename
				)
			);
		}
		return self::$html_head_entries;
	}

	// }}}
}

?>
