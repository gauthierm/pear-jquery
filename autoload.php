<?php

namespace Silverorange\Autoloader;

$package = new Package('silverorange/jquery');

$package->addRule(new Rule('', 'JQuery'));

Autoloader::addPackage($package);

?>
