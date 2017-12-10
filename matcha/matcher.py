# Dependencies
from difflib import SequenceMatcher

def is_string_valid(s):
	# Validate that string isn't empty
	try:
		return len(s) > 0
	except TypeError:
	    return False

# Pass a list or an array
def stringify(s):
	is_string_valid(s)
	# Convert array into string
	s1 = ' '.join(s)
	# Force into lowercase
	s2 = s1.lower()
	# Remove leading and trailing whitespace
	s3 = s2.strip()
	return s3

# Partial ratio fuzzy matching approach
def fuzzy_partial(s1, s2):
    
    if len(s1) <= len(s2):
        short = s1
        long = s2
    else:
        short = s2
        long = s1

    seq = SequenceMatcher(None, short, long)
    matches = seq.get_matching_blocks()

    ratios = []
    for match in matches:
        long_start = match[1] - match[0] if (match[1] - match[0]) > 0 else 0
        long_end = long_start + len(short)
        long_substr = long[long_start:long_end]
        seq2 = SequenceMatcher(None, short, long_substr)
        rat = seq2.ratio()
        if rat > .995:
            return 100
        else:
            ratios.append(rat)

    ratio = int(round(100 * max(ratios)))
    return ratio

# Pass two strings (skill & desired)
def match(skills, desired):
	# Tokenize
	skills_token1 = set(skills.split())
	desired_token1 = set(desired.split())

	# Take intersection and differences
	intersection = skills_token1.intersection(desired_token1)
	diffs1 = skills_token1.difference(desired_token1)
	difft1 = desired_token1.difference(skills_token1)

	# Sort intersection and differences
	sorted_intersection = " ".join(sorted(intersection))
	sorted_StoT = " ".join(sorted(diffs1))
	sorted_TtoS = " ".join(sorted(difft1))

	# Combine sorted intersection + differences, respectively
	combined_StoT = sorted_intersection + " " + sorted_StoT
	combined_TtoS = sorted_intersection + " " + sorted_TtoS

	# Clean strings
	sorted_intersection = sorted_intersection.strip()
	combined_StoT = combined_StoT.strip()
	combined_TtoS = combined_TtoS.strip()	
	
	result = fuzzy_partial(combined_StoT, combined_TtoS)
	return result